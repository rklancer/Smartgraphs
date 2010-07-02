require 'spec_helper'

describe StaticAnnotationsController do

  def mock_static_annotations(stubs={})
    @mock_static_annotations ||= mock_model(StaticAnnotations, stubs)
  end

  describe "GET index" do
    it "assigns all static_annotations as @static_annotations" do
      StaticAnnotations.stub(:find).with(:all).and_return([mock_static_annotations])
      get :index
      assigns[:static_annotations].should == [mock_static_annotations]
    end
  end

  describe "GET show" do
    it "assigns the requested static_annotations as @static_annotations" do
      StaticAnnotations.stub(:find).with("37").and_return(mock_static_annotations)
      get :show, :id => "37"
      assigns[:static_annotations].should equal(mock_static_annotations)
    end
  end

  describe "GET new" do
    it "assigns a new static_annotations as @static_annotations" do
      StaticAnnotations.stub(:new).and_return(mock_static_annotations)
      get :new
      assigns[:static_annotations].should equal(mock_static_annotations)
    end
  end

  describe "GET edit" do
    it "assigns the requested static_annotations as @static_annotations" do
      StaticAnnotations.stub(:find).with("37").and_return(mock_static_annotations)
      get :edit, :id => "37"
      assigns[:static_annotations].should equal(mock_static_annotations)
    end
  end

  describe "POST create" do

    describe "with valid params" do
      it "assigns a newly created static_annotations as @static_annotations" do
        StaticAnnotations.stub(:new).with({'these' => 'params'}).and_return(mock_static_annotations(:save => true))
        post :create, :static_annotations => {:these => 'params'}
        assigns[:static_annotations].should equal(mock_static_annotations)
      end

      it "redirects to the created static_annotations" do
        StaticAnnotations.stub(:new).and_return(mock_static_annotations(:save => true))
        post :create, :static_annotations => {}
        response.should redirect_to(static_annotation_url(mock_static_annotations))
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved static_annotations as @static_annotations" do
        StaticAnnotations.stub(:new).with({'these' => 'params'}).and_return(mock_static_annotations(:save => false))
        post :create, :static_annotations => {:these => 'params'}
        assigns[:static_annotations].should equal(mock_static_annotations)
      end

      it "re-renders the 'new' template" do
        StaticAnnotations.stub(:new).and_return(mock_static_annotations(:save => false))
        post :create, :static_annotations => {}
        response.should render_template('new')
      end
    end

  end

  describe "PUT update" do

    describe "with valid params" do
      it "updates the requested static_annotations" do
        StaticAnnotations.should_receive(:find).with("37").and_return(mock_static_annotations)
        mock_static_annotations.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :static_annotations => {:these => 'params'}
      end

      it "assigns the requested static_annotations as @static_annotations" do
        StaticAnnotations.stub(:find).and_return(mock_static_annotations(:update_attributes => true))
        put :update, :id => "1"
        assigns[:static_annotations].should equal(mock_static_annotations)
      end

      it "redirects to the static_annotations" do
        StaticAnnotations.stub(:find).and_return(mock_static_annotations(:update_attributes => true))
        put :update, :id => "1"
        response.should redirect_to(static_annotation_url(mock_static_annotations))
      end
    end

    describe "with invalid params" do
      it "updates the requested static_annotations" do
        StaticAnnotations.should_receive(:find).with("37").and_return(mock_static_annotations)
        mock_static_annotations.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :static_annotations => {:these => 'params'}
      end

      it "assigns the static_annotations as @static_annotations" do
        StaticAnnotations.stub(:find).and_return(mock_static_annotations(:update_attributes => false))
        put :update, :id => "1"
        assigns[:static_annotations].should equal(mock_static_annotations)
      end

      it "re-renders the 'edit' template" do
        StaticAnnotations.stub(:find).and_return(mock_static_annotations(:update_attributes => false))
        put :update, :id => "1"
        response.should render_template('edit')
      end
    end

  end

  describe "DELETE destroy" do
    it "destroys the requested static_annotations" do
      StaticAnnotations.should_receive(:find).with("37").and_return(mock_static_annotations)
      mock_static_annotations.should_receive(:destroy)
      delete :destroy, :id => "37"
    end

    it "redirects to the static_annotations list" do
      StaticAnnotations.stub(:find).and_return(mock_static_annotations(:destroy => true))
      delete :destroy, :id => "1"
      response.should redirect_to(static_annotations_url)
    end
  end

end
